<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import fetchData from '@/lib/fetch-data';
import { Loader2Icon, SearchIcon, XIcon } from 'lucide-vue-next';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from '@/components/ui/input-group';
import MemberCard from '@/components/custom/MemberCard.vue';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const members = ref<MemberInfo[]>([]);
const filteredMembers = ref<MemberInfo[]>([]);

const search = (query?: string) => {
	if(!query) {
		if(!searchQuery.value) return;
		router.push({ query: { search: searchQuery.value } });
	}
	filteredMembers.value = members.value.filter(member =>
		(member.name.includes(query || searchQuery.value) ||
			member.aka?.includes(query || searchQuery.value) ||
			member.role.includes(query || searchQuery.value))
	);
	console.log(filteredMembers.value);
}

onMounted(async () => {
	searchQuery.value = decodeURIComponent(route.query.search?.toString() || '');
	search();
	members.value = await fetchData('members');
	filteredMembers.value = members.value;
});
</script>

<template>
	<div v-if="members.length === 0" class="w-full h-full flex items-center justify-center">
		<Loader2Icon class="animate-spin" /> 加载中...
	</div>
	<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
		<template v-for="member in filteredMembers" :key="member.name">
			<MemberCard v-if="typeof member._show === 'undefined' || member._show" :member="member" />
		</template>
	</div>
</template>
