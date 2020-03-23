import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      component: r => require.ensure([], () => r(require('../pages/home/loc')), 'loc')
    },
    {
      path: 'index',
      component: r => require.ensure([], () => r(require('../pages/home/index')), 'home')
    },
    {
      path: 'dining-address',
      component: r => require.ensure([], () => r(require('../pages/home/address')), 'dining-address')
    },
    {
      path: 'confirm',
      component: r => require.ensure([], () => r(require('../pages/confirm')), 'confirm')
    },
    {
      path: 'detail/:gasId?/:oilNo?',
      component: r => require.ensure([], () => r(require('../pages/detail')), 'detail')
    },
    {
      path: 'list',
      component: r => require.ensure([], () => r(require('../pages/list/index')), 'list')
    },
    {
      path: 'detail/:detailId',
      component: r => require.ensure([], () => r(require('../pages/detail')), 'detail')
    },
    {
      path: 'result/:status/:orderId?',
      component: r => require.ensure([], () => r(require('../pages/result')), 'result')
    }
  ]
}]

