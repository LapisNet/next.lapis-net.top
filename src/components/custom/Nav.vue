<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import NavItems from '@/components/custom/NavItems.vue';
import { SunIcon, MoonIcon } from 'lucide-vue-next';
import { pages, secretPages } from '@/router';
import { useDark } from '@vueuse/core';
import { Button } from '../ui/button';
import fetchData from '@/lib/fetch-data';

const isDark = useDark();

const timeState = reactive({
	interval: 0,
	time: '08:00',
	fullTime: '08:00:00',
	date: '1970/01/01 周四'
});

const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const outPages = ref<LinkInfo[]>([]);

defineProps<{
	secret: boolean;
}>();

onMounted(async () => {
	timeState.interval = setInterval(() => {
		const date = new Date();
		timeState.time = date.toLocaleTimeString().replace(/:\d{2}$/, '');
		timeState.fullTime = date.toLocaleTimeString();
		timeState.date = date.toLocaleString().split(' ')[0] + ' ' + weekDays[date.getDay()];
	}, 1000);

	outPages.value = await fetchData('links');
});

onUnmounted(() => {
	clearInterval(timeState.interval);
});
</script>

<template>
	<NavigationMenu class="sticky left-0 top-0 p-4 max-w-full justify-between bg-background/20 backdrop-blur-lg border-b border-border">
		<NavigationMenuList class="font-heading">
			<NavigationMenuItem>
				<NavigationMenuTrigger>
					LapisNet
				</NavigationMenuTrigger>
				<NavigationMenuContent class="md:static">
					<ul class="flex flex-col gap-2 w-fit items-center hover:*:bg-background/20">
						<NavItems :pages="pages" :outPages="outPages" />
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>

			<NavigationMenuItem v-if="secret">
				<NavigationMenuTrigger>
					???
				</NavigationMenuTrigger>
				<NavigationMenuContent class="md:static">
					<ul class="flex flex-col gap-2 w-20 items-center hover:*:bg-background/20">
						<NavItems :pages="secretPages" />
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
		</NavigationMenuList>

		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuTrigger>
					{{ timeState.time }}
				</NavigationMenuTrigger>
				<NavigationMenuContent class="md:static">
					<div class="p-4 flex flex-col items-center">
						<span>{{ timeState.fullTime }}</span>
						<span>{{ timeState.date }}</span>
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<Button variant="ghost" @click="isDark = !isDark">
					<SunIcon v-if="!isDark" />
					<MoonIcon v-else />
				</Button>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
</template>
