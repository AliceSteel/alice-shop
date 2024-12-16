<template>
    <AppHeader />
    <div class="p-8 w-full min-h-screen bg-lime-200 text-lg flex gap-8">
        <AppMenu />
        <div class="w-4/5 mx-auto">
            <slot />
        </div>
    </div>
</template>