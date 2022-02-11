import s from './Copyright.module.scss'

interface ICopyrightProps {
    ref?: HTMLAnchorElement
}

export default function Copyright(props: ICopyrightProps) {
    return <a ref={props.ref} href="https://t.me/bohdan_fj" class={s.copyright}>Сайт сделан <span>Белецкими</span> в 2022 году</a>
}