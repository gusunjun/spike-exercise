import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	View,
	Text,
	ScrollView,
} from 'react-native';
import OrderComponent from './OrderComponent';
export default class OrdersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { orders: [] };
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			fetch('https://ripple506.herokuapp.com/GetOrderHistory', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Connection': 'Keep-Alive',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ UserName: 'JunyuTest' }),
			})
				// .then((response) => response.json())
				.then((response) => response.json())

				.then(async (json) => {
					this.setState({ orders: json });
					console.log(json);
					if (json.Status) {
					}
				});
		});
	}

	getOrderItems() {
		const { orders } = this.state;
		let props = ['DUMMYDATA'];
		let orderComponents = [];
		for (let i = 0; i < orders.length; i++) {
			console.log(orders[i]);
			orderComponents.push(
				<OrderComponent
					key={i}
					OrderId={orders[i].OrderID}
					TimetoPickUp={orders[i].TimetoPickUp}
					TotalCost={orders[i].TotalCost}
					Status={orders[i].Status}
					CarDescription={orders[i].CarDescription}
					CreatedTime={orders[i].CreatedTime}
					FoodItems={orders[i].FoodItems}
				/>
			);
		}
		return orderComponents;
	}
	render() {
		return (
			<ScrollView>
				<View
					style={{
						width: '95%',
						height: '95%',
						justifyContent: 'center',
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center',
					}}>
					<Text style={{ fontWeight: '700', fontSize: 30 }}>
						Your Previous Orders
					</Text>

					{this.getOrderItems()}

					{/* <OrderItem key={1} /> */}
				</View>
			</ScrollView>
		);
	}
}
