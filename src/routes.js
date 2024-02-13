import { createRouter, createWebHistory } from 'vue-router';
import authService from './auth/authService';
import userService from './auth/userService';

const routes = [

    {
        path: '/',
        component: () => import('./components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/HomePage.vue'),
                meta: { breadcrumb: 'Home' }
            },
            {
                path: '/about',
                component: () => import('./components/AboutUs.vue'),
                meta: { breadcrumb: 'About Us' }
            },
            {
                path: '/contact',
                component: () => import('./components/ContactUs.vue'),
                meta: { breadcrumb: 'Contact us' }
            },
            {
                path: '/shop',
                component: () => import('./components/ShopPage/index.vue'),
                meta: { breadcrumb: 'Shop' }
            },
            {
                path: '/login',
                component: () => import('./components/LoginPage.vue')
            },

            {
                path: '/faqs',
                component: () => import('./components/FaqsPage.vue'),
                meta: { breadcrumb: 'FAQS' }
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
                path: '/on-sale',
                component: () => import('./components/OnSale/index.vue'),
                meta: { breadcrumb: 'On-sale' }
            },

            {
                path: '/privacy-policy',
                component: () => import('./components/PrivacyPolicy.vue')
            },
            {
                path: '/cart',
                component: () => import('./components/CartPage/index.vue'),
                meta: { breadcrumb: 'Cart' }
            },
            {
                path: '/wishlist',
                component: () => import('./components/WishList/index.vue'),
                meta: { breadcrumb: 'Wishlist' }
            },
            {
                path: '/checkout',
                component: () => import('./components/CheckoutPage/index.vue'),
                name: 'CheckoutPage',
                props: true,
                meta: { breadcrumb: 'Checkout' }
            },
            {
                path: '/thank-you',
                component: () => import('./components/ThankyouPage/index.vue'),
                props: true,
                name: 'ThankYou',
                meta: { breadcrumb: 'Thank-you' }
            },
            {
                path: "/product/:name",
                component: () => import("./components/SingleProduct/index.vue"),
                name: 'SingleProduct',
                meta: { breadcrumb: ':name' }
            },
            {
                path: '/category/:name',
                component: () => import('./components/SelectedCategory/index.vue'),
                meta: { breadcrumb: ':name' }
            },
            // Customers Route
            {

                path: '/user-account',
                component: () => import('./components/UserPage/index.vue'),
                name: 'UserPage',
                props: true,
                beforeEnter: (to, from, next) => {
                    // Check if the user is authenticated
                    if (userService.isAuthenticated()) {
                        // Clear the logout timer when navigating to a new route
                        userService.clearLogoutTimer();
                        // User is authenticated, proceed to the admin page
                        next();
                    } else {
                        // User is not authenticated, replace the history entry with the login page
                        next({ path: '/login', replace: true });
                    }
                },

            },
            {
                path: '/:pathMatch(.*)*',
                component: () => import('./components/404Page.vue')
            },


        ]

    },


    // Admin routes
    {
        path: '/adminpage/dashboard',
        component: () => import('./components/AdminDashboard/index.vue'),
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            if (authService.isAuthenticated()) {
                // Clear the logout timer when navigating to a new route
                authService.clearLogoutTimer();
                // User is authenticated, proceed to the admin page
                next();
            } else {
                // User is not authenticated, replace the history entry with the login page
                next({ path: '/admin', replace: true });
            }
        },

        children: [
            {
                path: '',
                component: () => import('./components/AdminDashboard/SummaryPage.vue')
            },
            {
                path: '/transactions',
                component: () => import('./components/AdminDashboard/AllTransactions.vue')

            },
            {
                path: '/all-customers',
                component: () => import('./components/AdminDashboard/AllCustomers.vue')

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
