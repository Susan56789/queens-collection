<template>
    <StatisticsPage />
    <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

        <SocialTraffic />

        <RecentActivities />
    </div>

    <TaskSummaries />

    <ClientTable />
</template>

<script>
import StatisticsPage from '@/components/AdminDashboard/Main/StatisticsPage'
import SocialTraffic from '@/components/AdminDashboard/Main/SocialTraffic'
import RecentActivities from '@/components/AdminDashboard/Main/RecentActivities'
import TaskSummaries from '@/components/AdminDashboard/Main/TaskSummaries'
import ClientTable from '@/components/AdminDashboard/Main/ClientTable'

export default {
    name: 'SummaryPage',
    components: {
        StatisticsPage,
        SocialTraffic,
        RecentActivities,
        TaskSummaries,
        ClientTable
    }
}
</script>