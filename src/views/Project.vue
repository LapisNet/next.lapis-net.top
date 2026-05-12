<script setup lang="ts">
import { ref, onMounted } from 'vue';
import fetchData from '@/lib/fetch-data';
import { Loader2Icon } from 'lucide-vue-next';
import ProjectCard from '@/components/custom/ProjectCard.vue';

const projects = ref<ProjectInfoV2[]>([]);

onMounted(async () => {
	projects.value = await fetchData('projects_v2');
});
</script>

<template>
	<div v-if="projects.length === 0" class="w-full h-full flex items-center justify-center">
		<Loader2Icon class="animate-spin" /> 加载中...
	</div>
	<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<template v-for="project in projects" :key="project.name">
			<ProjectCard v-if="typeof project._show === 'undefined' || project._show" :project="project" />
		</template>
	</div>
</template>
