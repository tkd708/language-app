import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeRow } from 'react-native-swipe-list-view';

const { width } = Dimensions.get('window');

export default class List extends Component {
	constructor(props) { 
		super(props);
		this.state = {
		  modalVisible: false,
		};
	  }

	onToggleCircle = () => {
		const { isCompleted, id, completeItem, incompleteItem } = this.props;
		if (isCompleted) {
			incompleteItem(id);
		} else {
			completeItem(id);
		}
	};


	render() {
		const { wordIn, wordOut, deleteItem, id, isCompleted } = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity onPress={this.onToggleCircle}>
						<View
							style={[
								styles.circle,
								isCompleted
									? { borderColor: '#90ee90' }
									: { borderColor: '#ecbfbe' }
							]}
						/>
					</TouchableOpacity>

					<TouchableOpacity>
					<SwipeRow
						leftOpenValue={120}
						rightOpenValue={0}
					>
						<View style={styles.rowBack}>
							<Text style={styles.rowBackText}>{wordOut}</Text>
						</View>
						<View style={styles.rowFront}>
						<Text
						style={[
							styles.rowFrontText,
							isCompleted
								? {
										color: '#c4c4cc',
										textDecorationLine: 'line-through'
								  }
								: { color: '#555555' }
						]}
						>
						{wordIn}
						</Text>
						</View>
					</SwipeRow>						
					</TouchableOpacity>
				</View>

				{isCompleted ? (
					<View style={styles.button}>
						<TouchableOpacity onPressOut={() => deleteItem(id)}>
							<MaterialIcons
								name="delete-forever"
								size={24}
								color={'#bc2e4c'}
							/>
						</TouchableOpacity>
					</View>
				) : null}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width - 40,
		flexDirection: 'row',
		borderRadius: 5,
		backgroundColor: 'white',
		height: width / 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 5,
		marginHorizontal: 20,
		marginBottom: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50,50,50)',
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0
				}
			},
			android: {
				elevation: 5
			}
		})
	},
	column: {
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		width: width/1.5,
		height: width/8 -2,
		borderRadius: 5,
	},
	rowBack: {
		backgroundColor: '#1C783F',
		alignItems: 'center',
		justifyContent: 'center',
		height: width/8 -2,
		width: 120,
	},
	rowBackText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 15,
		marginVertical: 10
	},
	rowFront: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		height: width/8 -2,
		width: 120,
	},
	rowFrontText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 15,
		marginVertical: 10
	},

	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 3,
		margin: 10
	},
	button: {
		marginRight: 10
	},
	
});
