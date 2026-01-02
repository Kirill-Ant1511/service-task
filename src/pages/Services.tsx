import { ShoppingCart } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { ServiceCard } from '../components/ServiceCard'
import style from '../styles/Services.module.css'
import type { BasketItem } from '../types/basket.type'
import type { Service } from '../types/service.type'

const SERVICES: Service[] = [
	{
		id: 1,
		title: 'Услуга 1',
		price: 500
	},
	{
		id: 2,
		title: 'Услуга 2',
		price: 500
	},
	{
		id: 3,
		title: 'Услуга 3',
		price: 500
	}
]
export function Services() {
	const [basket, setBasket] = useState<BasketItem[]>(() => {
		const basket = localStorage.getItem('basket')
		return basket ? (JSON.parse(basket) as BasketItem[]) : ([] as BasketItem[])
	})

	const total = useMemo(() => {
		return basket.reduce((acc, item) => {
			return acc + item.service.price * item.quantity
		}, 0)
	}, [basket])

	const updateBasket = (newBasket: BasketItem[]) => {
		localStorage.setItem('basket', JSON.stringify(newBasket))
		setBasket(JSON.parse(localStorage.getItem('basket')!) as BasketItem[])
	}

	const onClick = useCallback(() => {
		alert(
			'@Palma1511 Telegram для связи) Жду вашего ответа. Конечная стоимость заказа ' +
				total
		)
	}, [total])

	return (
		<>
			<main className={style.container}>
				<h1>Услуги</h1>
				<div className={style.service_list}>
					{SERVICES.map(service => (
						<ServiceCard
							service={service}
							key={service.id}
							basket={basket}
							setBasket={updateBasket}
						/>
					))}
				</div>
			</main>
			<footer className={style.footer_container}>
				<div className={style.service_list}>
					{basket.map(service => {
						if (service === null) return null
						return (
							<ServiceCard
								key={service.service.id}
								service={service.service}
								basket={basket}
								setBasket={updateBasket}
							/>
						)
					})}
				</div>
				<div>
					<div className={style.info}>
						<ShoppingCart />
						<h2>{total}</h2>
					</div>
					<button onClick={onClick}>Оформить заказ</button>
				</div>
			</footer>
		</>
	)
}
