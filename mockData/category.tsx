export enum CATEGORY {
    ALL='All',
    SPORT='Sport',
    FAMILY='Family',
    SUV='SUV',
    WORK='Work',
    ELECTRIC='Electric'   
}

export type Icategory = {
    id: string,
    name: CATEGORY
}

export const categories: Icategory[] = [
    {
        id: '1',
        name: CATEGORY.ALL
    },
    {
        id: '2',
        name: CATEGORY.SPORT
    },
    {
        id: '3',
        name: CATEGORY.FAMILY
    },
    {
        id: '4',
        name: CATEGORY.SUV
    },
    {
        id: '5',
        name: CATEGORY.WORK
    },
    {
        id: '6',
        name: CATEGORY.ELECTRIC
    }

]