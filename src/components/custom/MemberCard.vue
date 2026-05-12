<script setup lang="ts">
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

defineProps<{
	member: MemberInfo;
}>();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>
				<div class="flex justify-baseline items-center gap-2">
					<Avatar>
						<AvatarImage v-if="member.avatar" :src="member.avatar" :alt="member.avatar" />
						<AvatarFallback v-else>{{ member.name }}</AvatarFallback>
					</Avatar>
					<p class="flex flex-col justify-center">
						{{ member.name }}
						<span class="text-sm text-gray-500">{{ member.aka }}</span>
					</p>
				</div>
			</CardTitle>
			<CardDescription>
				{{ member.role }}
			</CardDescription>
		</CardHeader>
		<CardContent v-if="member.bio">
			{{ parse(member.bio) }}
		</CardContent>
		<CardFooter class="border-t border-border/20 bg-sky-100 dark:bg-background/20 p-4" v-if="member.url">
			<Button as-child>
				<a :href="member.url" target="_blank" rel="noopener">
					个人页面 <SquareArrowOutUpRightIcon />
				</a>
			</Button>
		</CardFooter>
	</Card>
</template>
