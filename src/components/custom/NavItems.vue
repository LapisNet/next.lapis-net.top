<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '../ui/button';
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
defineProps<{
	pages: import('vue-router').RouteRecordRaw[];
	outPages?: LinkInfo[];
}>();
</script>

<template>
	<NavigationMenuItem v-for="page in pages" :key="page.path">
		<NavigationMenuLink>
			<Button variant="link" as-child class="text-secondary-foreground">
				<RouterLink as-child :to="page.path">
					{{ page.meta?.title || '???' }}
				</RouterLink>
			</Button>
		</NavigationMenuLink>
	</NavigationMenuItem>

	<li v-if="outPages" class="bg-border! h-px w-full" />

	<NavigationMenuItem v-if="outPages" v-for="link in outPages" :key="link.title">
		<NavigationMenuLink>
			<Button variant="link" as-child class="text-secondary-foreground">
				<a :href="link.link" target="_blank" rel="noopener">
					{{ link.title }}
					<SquareArrowOutUpRightIcon />
				</a>
			</Button>
		</NavigationMenuLink>
	</NavigationMenuItem>
</template>
