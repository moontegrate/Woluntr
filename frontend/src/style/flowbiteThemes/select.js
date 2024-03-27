export const SelectTheme = {
    base: 'flex',
    addon: 'inline-flex items-center rounded-l-md bg-gray-200 px-3 text-sm text-gray-900 dark:bg-gray-600 dark:text-gray-400',
    field: {
        base: 'relative w-full',
        icon: {
            base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
            svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
        },
        select: {
            base: 'block w-full disabled:cursor-not-allowed disabled:opacity-50',
            withIcon: {
                on: 'pl-10',
                off: '',
            },
            withAddon: {
                on: 'rounded-r-lg',
                off: 'rounded-[20px]',
            },
            withShadow: {
                on: 'shadow-sm dark:shadow-sm-light',
                off: '',
            },
            sizes: {
                sm: 'p-2 sm:text-xs',
                md: 'p-2.5 text-sm',
                lg: 'sm:text-md p-4',
            },
            colors: {
                gray: "border bg-gray-50 text-gray-900 focus:border-main-color focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-main-color dark:focus:ring-none"
            }
        }
    }
};