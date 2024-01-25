import { createRouter, createWebHistory } from 'vue-router';


const routes = [

    {
        path: '/',
        component: () => import('./components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/HomePage.vue')
            },
            {
                path: '/about',
                component: () => import('./components/AboutUs.vue')
            },
            {
                path: '/contact',
                component: () => import('./components/ContactUs.vue')
            },
            {
                path: '/shop',
                component: () => import('./components/ShopPage/index.vue')
            },
            {
                path: '/login',
                component: () => import('./components/LoginPage.vue')
            },
            {
                path: '/logout',
                component: () => import('./components/LogoutPage.vue')
            },
            {
                path: '/faqs',
                component: () => import('./components/FaqsPage.vue')
            },
            {
                path: '/password-reset',
                component: () => import('./components/ForgotPassword.vue')
            },
            {
                path: '/sign-up',
                component: () => import('./components/NewUser.vue')
            },
            {
                path: '/admin',
                component: () => import('./components/AdminDashboard/AdminLogin.vue')
            },
            {
                path: '/user-account',
                component: () => import('./components/UserPage/index.vue')
            },

            {
                path: '/privacy-policy',
                component: () => import('./components/PrivacyPolicy.vue')
            },
            {
                path: '/cart',
                component: () => import('./components/CartPage/index.vue')
            },
            {
                path: '/wishlist',
                component: () => import('./components/WishList/index.vue')
            },
            {
                path: '/checkout',
                component: () => import('./components/CheckoutPage/index.vue')
            },
            {
                path: '/thank-you',
                component: () => import('./components/ThankyouPage/index.vue')
            },
            {
                path: '/product/:id',
                component: () => import('./components/SingleProduct/index.vue')
            },
            {
                path: '/category/:id',
                component: () => import('./components/SelectedCategory/index.vue')
            },
            {
                path: '/:pathMatch(.*)*',
                component: () => import('./components/404Page.vue')
            },

        ]

    },
    {
        path: '/adminpage/dashboard',
        component: () => import('./components/AdminDashboard/index.vue'),

        children: [
            {
                path: '',
                component: () => import('./components/AdminDashboard/SummaryPage.vue')
            },
            {
                path: '/adminpage/orderpage',
                component: () => import('./components/AdminDashboard/OrdersPage.vue')
            },
            {
                path: '/adminpage/newproduct',
                component: () => import('./components/AdminDashboard/AddProducts.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
});


export default router;
