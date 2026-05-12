<script setup lang="ts">
import { ref, onMounted } from 'vue';
import fetchData from '@/lib/fetch-data';
import { convert } from '@/lib/project-v2coventer';
import { Loader2Icon } from 'lucide-vue-next';
import ProjectCard from '@/components/custom/ProjectCard.vue';

const projects = ref<ProjectInfo[]>([]);

onMounted(async () => {
	projects.value = await fetchData('projects');
});
</script>

<template>
	<div v-if="projects.length === 0" class="w-full h-full flex items-center justify-center">
		<Loader2Icon class="animate-spin" /> 加载中...
	</div>
	<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<template v-for="project in projects" :key="project.title">
			<ProjectCard v-if="typeof project._show === 'undefined' || project._show"
				:project="convert(project)" />
		</template>
	</div>
</template>
