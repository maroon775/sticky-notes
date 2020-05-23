// навигация по стикерам
// список из ссылок для быстрой навигации по стикерам
/*
- Заметка о том что надо что-то делать в янв...
- Заметка на пятницу. Пойти купить овощей и...
- Позвонить в службу поддержки населения...
- Выгулять Мартина после домашних занятий по...
 */
export interface NavigatorItem {
    title: String,
    targetId: number
}

export interface Navigator {
    expanded: Boolean,
    items: NavigatorItem[]
}
