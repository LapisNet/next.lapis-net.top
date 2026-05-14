<script setup lang="ts">
import { cn } from '@/lib/utils';
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { parse } from '@/lib/late-marked';
import { Button } from '../ui/button';

const roleBadgeColorMap: Record<string, string> = {
	'组长': 'bg-red-500 text-white dark:bg-red-600',
	'核心成员': 'bg-rose-500 text-white dark:bg-rose-600',
	'正式成员': 'bg-gray-500 text-white dark:bg-gray-600',
	'合作伙伴': 'bg-white text-black dark:bg-white/80',
	default: 'bg-black text-white dark:bg-black/80'
}

defineProps<{
	member: MemberInfo;
}>();
</script>

<template>
	<Card class="min-h-50 relative bg-transparent *:not-first:backdrop-blur-xs flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-hidden">
		<img v-if="member.avatar" :src="member.avatar" :alt="`${member.name} 头像`"
			class="absolute top-0 left-0 w-full h-full object-cover -z-1 rounded-md" />
		<CardHeader v-if="member.bio" class="bg-card/80 dark:bg-card/40 border-b border-border rounded-t-md justify-between items-center flex-row">
			<CardTitle>
			</CardTitle>
			<CardDescription>
				<p class="dark:text-card-foreground/80" v-html="parse(member.bio)" />
			</CardDescription>
		</CardHeader>
		<CardFooter class="absolute bottom-0 left-0 right-0 border-t border-border bg-card/50 dark:bg-background/40 p-4 rounded-b-md">
			<div class="w-full flex justify-between items-center gap-2">
				<div class="flex flex-col justify-center">
					<span class="flex gap-2">
						<span class="font-bold">{{ member.name }}</span>
						<Badge class="pointer-events-none" :class="roleBadgeColorMap[member.role] || roleBadgeColorMap.default">
							{{ member.role }}
						</Badge>
					</span>
					<span v-if="member.aka" class="text-sm text-card-foreground/80">{{ member.aka }}</span>
				</div>
				<Button v-if="member.url" as-child>
					<a :href="member.url" target="_blank" rel="noopener">
						个人页面 <SquareArrowOutUpRightIcon />
					</a>
				</Button>
			</div>
		</CardFooter>
	</Card>
</template>
