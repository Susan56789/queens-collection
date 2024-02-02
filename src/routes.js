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
                path: '/on-sale',
                component: () => import('./components/OnSale/index.vue')
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
                component: () => import('./components/CheckoutPage/index.vue'),
                name: 'CheckoutPage',
                props: true
            },
            {
                path: '/thank-you',
                component: () => import('./components/ThankyouPage/index.vue')
            },
            // {
            //     path: '/product/:id',
            //     component: () => import('./components/SingleProduct/index.vue')
            // },
            {
                path: "/product/:name",
                component: () => import("./components/SingleProduct/index.vue"),
                props: true,
                name: 'SingleProduct',
            },
            {
                path: '/category/:id',
                component: () => import('./components/SelectedCategory/index.vue')
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
