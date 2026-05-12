<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Nav from '@/components/custom/Nav.vue';
import Footer from '@/components/custom/Footer.vue';
import * as outlinkHook from '@/lib/outlink-hook';

const router = useRouter();
const secretStatus = ref(false);
const secretKeys = 'asdfghjkl;\'';
const inputKeys = ref<string[]>([]);

const onKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		if (inputKeys.value.join('') === secretKeys) {
			secretStatus.value = true;
			window.removeEventListener('keydown', onKeyDown);
		}
	} else inputKeys.value.push(e.key);
}

onMounted(() => {
	if(decodeURIComponent(router.currentRoute.value.query.secret?.toString() || '') === secretKeys)
		secretStatus.value = true;
	else window.addEventListener('keydown', onKeyDown);
	outlinkHook.init(router);
});

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyDown);
	outlinkHook.destroy(router);
});
</script>

<template>
	<Nav :secret="secretStatus" />
	<main>
		<router-view class="min-h-[80%] p-4" v-slot="{ Component }">
			<transition name="scale">
				<component :is="Component" />
			</transition>
		</router-view>
	</main>
	<Footer />
</template>
