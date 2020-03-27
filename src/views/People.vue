<template>
  <div
    class="people"
    :class="{ 'people--get': mode === 'get', 'people--give': mode === 'give'  }"
  >
    <div class="flex justify-space-between people-nav">
      <div
        class="people-mode"
      >
        <span class="people-mode-give">I want to help</span>
        <AntSwitch v-model="switchValue" @change="setModeQueryParam"></AntSwitch>
        <span class="people-mode-get">I need help</span>
      </div>
      <AntButton
        type="primary"
        icon="plus-circle"
        @click="openAddModal"
      >
        {{ mode === 'get' ? 'Add help request' : 'Apply to help others' }}
      </AntButton>
    </div>
    <h1 class="heading heading--primary">{{ mode === 'get' ? 'These people can help you with something' : 'These people need your help' }}</h1>
    <AntTable
      :loading="loading"
      :columns="columns"
      :dataSource="mode === 'get' ? peopleGet : peopleGive"
      :pagination="false"
      class="people-table"
      :row-key="record => record.name"
    >
      <span slot="image" slot-scope="image">
        <div class="people-image" :style="{backgroundImage: `url(${image})`}"></div>
      </span>
      <span slot="categories" slot-scope="categories">
        <AntTag
          v-for="tag in categories"
          :key="tag"
        >
          {{ tag.toUpperCase() }}
        </AntTag>
      </span>
      <span slot="thanks" slot-scope="thanks">
        {{  mode === 'give' ? '❤️' : '🙏' }}
        <span class="copy copy--bold">{{ thanks }}</span>
      </span>
      <span slot="distance" slot-scope="distance">
        <span class="copy copy--bold">{{ distance }} km</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <div class="people-actions">
          <AntButton :loading="helpLoading === record.id" type="primary" @click="handleHelp(record)">
            {{ mode === 'get' ? 'Get help from this person' : 'Help this person' }}
          </AntButton>
          <div
            class="people-actions-more"
            @click="openPersonModal(record)"
          >
            <AntIcon type="export"></AntIcon> More info
          </div>
        </div>
      </span>
    </AntTable>
  </div>
</template>

<script>
  import {
    Button as AntButton,
    Table as AntTable,
    Tag as AntTag,
    Switch as AntSwitch,
    Icon as AntIcon
  } from 'ant-design-vue';

  import { providersNamespace } from '@/common/providers';
  import MoreUserInfoModal from '@/components/MoreUserInfoModal'
  import AddRequestModal from '@/components/AddRequestModal'

  import { mapState, mapActions } from 'easy-vuex-modules';
  import { people, requests } from '@/store';

  export default {
    name: 'People',
    components: {
      AntTable,
      AntButton,
      AntTag,
      AntSwitch,
      AntIcon,
    },
    inject: [
      providersNamespace.Modal
    ],
    data() {
      return {
        switchValue: false,
        modal: null,
        loading: null,
        helpLoading: null
      };
    },
    computed: {
      ...mapState([
        'user.details',
        {name: 'peopleGet', state: 'people.list.get'},
        {name: 'peopleGive', state: 'people.list.give'},
      ]),

      columns() {
        return [
          {
            dataIndex: 'image',
            key: 'image',
            scopedSlots: { customRender: 'image' },
            width: '5%'
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '12%'
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '12%'
          },
          {
            title: 'Category',
            key: 'categories',
            dataIndex: 'categories',
            scopedSlots: { customRender: 'categories' },
            width: '25%',
          },
          {
            title: this.mode === 'get' ? 'ThankYou Coins' : 'ReceivedHelp Coins',
            dataIndex: 'thanks',
            key: 'thanks',
            scopedSlots: { customRender: 'thanks' },
            width: '10%',
            sorter: (a, b) => b.thanks - a.thanks
          },
          {
            title: 'Distance',
            dataIndex: 'distance',
            key: 'distance',
            width: '10%',
            scopedSlots: { customRender: 'distance' },
            sorter: (a, b) => b.distance - a.distance
          },
          {
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ];
      },
      mode() {
        return this.switchValue ? 'get' : 'give';
      }
    },
    async mounted() {
      this.loading = true;
      if (!this.peopleGet.length && !this.peopleGive.length) {
        await this.hydratePeople();
      }
      this.$router.push({ name: 'People', query: { mode: this.mode } });
      this.loading = false;
    },
    methods: {
      ...mapActions([
        people.actions.hydratePeople,
        people.actions.addPerson,
        requests.actions.addRequest
      ]),

      openPersonModal(record) {
        this.modal = this.Modal.info({
          title: `Szczegołowe informacje dotyczące ${record.name}`,
          class: 'modal--no-buttons',
          icon: 'null',
          closable: true,
          content: this.customContentModalWrapper(
            MoreUserInfoModal,
            { user: record },
            {}
          )
        });
      },
      openAddModal() {
        this.modal = this.Modal.info({
          title: 'Dodaj ogłoszenie',
          class: 'modal--no-buttons',
          icon: 'null',
          closable: true,
          content: this.customContentModalWrapper(
            AddRequestModal,
            {},
            { add: this.addToList }
          )
        });
      },
      addToList(info) {
        this.addPerson({
          person: {
            image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            categories: [info.category],
            note: info.note,
            distance: 0,
            ...this.details
          },
          mode: this.mode
        });

        this.closeModal();

        this.$message.success('Your request has been added', 4);
      },
      customContentModalWrapper(component, props, events) {
        const h = this.$createElement;
        return h('div', {class: 'free-content-modal'}, [h(component, {props, on: events})])
      },
      closeModal() {
        this.modal.destroy();
        this.modal = null;
      },
      async handleHelp(record) {
        this.helpLoading = record.id;
        await this.addRequest({
          id: Math.floor(Math.random() * 1000),
          mode: this.mode,
          user: record,
          dateStarted: this.$moment().format('DD-MM-YYYY'),
          status: 'active',
          task: {
            category: record.categories[0]
          }
        });

        this.helpLoading = null;

        setTimeout(() => {
          this.$message.success(`${record.name} accepted the request!`, 4);
        }, 1000)
      },
      setModeQueryParam() {
        this.$router.push({ name: 'People', query: { mode: this.mode } });
      }
    }
  };
</script>

<style lang="scss">
  .people {
    max-width: 1300px;
    margin: 0 auto;

    &-nav {
      flex-direction: column;
      align-items: flex-start;

      @include md-up {
        flex-direction: row;
      }
    }

    .ant-switch {
      margin: 0 globalVars(ui-default-measure);
    }

    .ant-switch,
    .ant-switch-checked {
      background: color(gray-background-dark);
    }

    .ant-switch:after {
      background: color(primary);
    }

    .ant-switch-checked:after {
      background: color(accent);
    }

    h1 {
      margin-top: globalVars(ui-default-measure3x);
    }

    &-table {
      overflow-x: auto;

      table {
        border-collapse: separate;
        border-spacing: 0 5px;
        min-height: 150px;

        th, tr {
          border: none
        }

        th {
          vertical-align: bottom;
        }

        tbody tr {
          background: white;
          box-shadow: globalVars(ui-default-box-shadow);
        }

        td {
          position: relative;
          min-width: 80px;
        }
      }
    }

    &-image {
      @include center();
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &-mode {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      @include md-up {
        margin-bottom: 0;
      }

      .people-mode-give,
      .people-mode-get {
        @include font(16);
      }
    }

    &--get {
      .ant-rate-star-full svg {
        fill: color(accent);
      }

      .ant-tag,
      .ant-btn {
        background: color(accent);
      }

      .people-mode-get {
        color: color(accent);
        @include font-weight(600);
      }
    }

    &--give {
      .ant-rate-star-full svg {
        fill: color(primary);
      }

      .ant-tag,
      .ant-btn {
        background: color(primary);
      }

      .people-mode-give {
        color: color(primary);
        @include font-weight(600);
      }
    }

    &-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &-more {
        cursor: pointer;
        margin-left: globalVars(ui-default-measure3x)
      }
    }

  }
</style>
