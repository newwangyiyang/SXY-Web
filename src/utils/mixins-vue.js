import dayjs from 'dayjs';
const mixin = {
  computed: {
    isDeepRouterView() {
      return this.$route.fullPath.split('/').filter(Boolean).length >= 3
    }
  },
  methods: {
    bookcaseTableStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        return {
          textAlign: 'left',
          fontSize: 14,
          color: '#666',
          paddingLeft: '25px'
        };
      } else {
        return {
          textAlign: 'center',
          fontSize: 14,
          color: '#333'
        };
      }
    },
    bookcaseTableHeaderStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        return {
          textAlign: 'left',
          paddingLeft: '25px',
          fontSize: 14,
          color: '#666',
          backgroundColor: '#D8D8D8',
          fontWeight: 'normal'
        };
      } else {
        return {
          textAlign: 'center',
          fontSize: 14,
          color: '#666',
          backgroundColor: '#D8D8D8',
          fontWeight: 'normal'
        };
      }
    },
    headerCellStyle() {
      return {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
        backgroundColor: '#F7F6F9',
        fontWeight: 'normal'
      }
    },
    cellStyle() {
      return {
        textAlign: 'center',
        fontSize: 14,
        color: '#333'
      }
    },
    initChooseDate() {
      return [
        dayjs()
        .subtract(7, 'day')
        .format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ];
    },
    changeChooseDateHandler(type) {
      return type === 'seven' ? [
        dayjs()
        .subtract(7, 'day')
        .format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ] : [
        dayjs()
        .subtract(30, 'day')
        .format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ];
    },
    initDateParams(chooseDate) {
      return {
        startdate: chooseDate[0],
        enddate: chooseDate[1]
      }
    }
  }
}

export default [mixin]
