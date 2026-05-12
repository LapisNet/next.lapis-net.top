<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '../ui/button';
defineProps<{
	pages: import('vue-router').RouteRecordRaw[];
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
</template>
