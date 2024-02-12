<template>
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div class="flex items-center justify-between mb-4">
            <div class="flex-shrink-0">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ totalSummary.totalAmount
                }}</span>
                <h3 class="text-base font-normal text-gray-500">Sales this week</h3>
            </div>
            <div class="flex items-center justify-end flex-1 text-base font-bold">
                <template v-if="percentageChange === 0">
                    <span class="text-gray-500">No change</span>
                </template>
                <template v-else>
                    <span v-if="percentageChange < 0" class="text-red-500">{{ percentageChange }}%</span>
                    <span v-else class="text-green-500">{{ percentageChange }}%</span>
                </template>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>
        <div id="main-chart"></div>
    </div>
</template>


  
<script>
export default {
    name: 'TransactionSummary',
    props: {
        totalSummary: Object,
        previousWeekTotal: Number
    },
    computed: {
        percentageChange() {
            if (this.previousWeekTotal === 0) return 0;
            const change = (this.totalSummary.totalAmount - this.previousWeekTotal) / this.previousWeekTotal * 100;
            return change.toFixed(2);
        }
    }
};
</script>