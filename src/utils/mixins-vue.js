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
    }
  }
}

export default [mixin]
