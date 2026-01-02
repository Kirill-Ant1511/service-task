import { useEffect, useState } from 'react'
import style from '../styles/ServiceCard.module.css'
import type { BasketItem } from '../types/basket.type'
import type { Service } from '../types/service.type'
interface Props {
	service: Service
	basket: BasketItem[]
	setBasket: (basket: BasketItem[]) => void
}

export function ServiceCard({ service, basket, setBasket }: Props) {
	const [thereIsItem, setThereIsItem] = useState<boolean>(false)

	const addItem = () => {
		basket.push({ service, quantity: 1 })
		localStorage.setItem('basket', JSON.stringify(basket))
		setBasket(basket)
		setThereIsItem(true)
	}

	const addQuantity = () => {
		console.log(basket)

		basket.map(item => {
			if (item.service.id === service.id) {
				item.quantity += 1
			}
		})
		console.log(basket)
		setBasket(basket)
	}

	const subQuantity = () => {
		basket.map(item => {
			if (item.service.id === service.id) {
				item.quantity -= 1

				if (item.quantity === 0) {
					basket = basket.filter(item => item.service.id !== service.id)
					setThereIsItem(false)
				}
			}
		})
		setBasket(basket)
	}

	useEffect(() => {
		basket.forEach(item => {
			if (item.service.id === service.id) setThereIsItem(true)
		})
	}, [basket, service.id])

	return (
		<div className={style.card}>
			<div className={style.info}>
				<h2>{service.title}</h2>
				<p>{service.price}$</p>
			</div>
			{thereIsItem ? (
				<div className={style.quantity}>
					<button
						className={style.add_button}
						onClick={subQuantity}
					>
						-
					</button>
					<p>
						{basket.map(item => {
							if (item.service.id === service.id) {
								return item.quantity
							}
						})}
					</p>
					<button
						className={style.add_button}
						onClick={addQuantity}
					>
						+
					</button>
				</div>
			) : (
				<button
					className={style.add_button}
					onClick={addItem}
				>
					Добавить
				</button>
			)}
		</div>
	)
}
