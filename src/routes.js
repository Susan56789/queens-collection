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
