<template>
    <nav class="text-sm sm:text-base bg-white p-4 md:p-6 lg:p-6 rounded-md">
        <ol class="list-none p-0 inline-flex space-x-2">
            <li class="flex items-center">
                <svg onclick="window.location.href='/';" xmlns="http://www.w3.org/2000/svg" height="1em"
                    viewBox="0 0 576 512" class="cursor-pointer hover:fill-red-500 transition-colors duration-300"
                    fill="#4b5563">
                    <path
                        d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg> <span class="mx-2">/</span>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
                <span v-if="index !== breadcrumbs.length - 1">/</span>
                <span v-if="index === breadcrumbs.length - 1">{{ crumb.label }}</span>
                <router-link v-else :to="crumb.route">{{ crumb.label }}</router-link>

            </li>
        </ol>
    </nav>
</template>
  
<script>
export default {
    computed: {
        breadcrumbs() {
            const breadcrumbs = [];
            const matchedRoutes = this.$route.matched;

            matchedRoutes.forEach(route => {
                if (route.meta && route.meta.breadcrumb) {
                    breadcrumbs.push({
                        label: this.resolveBreadcrumbLabel(route),
                        route: route.path,
                    });
                }
            });

            return breadcrumbs;
        },
    },
    methods: {
        resolveBreadcrumbLabel(route) {
            // Use the provided breadcrumb label or dynamic route parameter as the label
            return route.meta.breadcrumb === ':name' ? this.$route.params.name : route.meta.breadcrumb;
        },
    },
};
</script>
  
<style scoped>
nav {
    position: relative;
    top: 0;
    left: 0;
}
</style>