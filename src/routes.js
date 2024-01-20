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
            }
        ]

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
});


// Add a loading state to the router
router.isLoading = false;

// Navigation guards to manage the loading state
router.beforeEach((to, from, next) => {
    router.isLoading = true;
    next();
});

router.afterEach(() => {
    setTimeout(() => {
        router.isLoading = false;
    }, 500); // You may adjust the timeout based on your preference
});


export default router;
