/*
	js Version 0.5 will based on python Version 0.4
	but will be written in javascript
*/
import dash
import dash_html_components as html
import dash_core_components as dcc
from dash.dependencies import Input, Output, State

import requests
import json
import locale


import pandas as pd
import time
import numpy as np
from plotly.offline import download_plotlyjs, init_notebook_mode, plot,iplot
import plotly.graph_objs as go

locale.setlocale(locale.LC_ALL, '')

/*
	in order to update basecd on interval, look at:
	https://dash.plot.ly/live-updates
	do a price update every 10 seconds
*/
var URL= "https://api.pro.coinbase.com";
var Current_Product= 'BTC-USD';
var n_intervals=0;
var Data_Level = 3;     //1, 2, 3 with 3 generating the most data
var SMA_Count = 100;
var Plot_Count= 0;
var Plot_Count_Max= 120;

function Get_Price(product){
	// This function will return the price of the product as a floating point number
	// product is a string such as 'BTC-USD', 'LTC-USD', 'ETH-USD', 'BCH-USD'
	// GET https://api.coinbase.com/products/<product-id>/ticker
	var request = URL + "/products/" + product + "/ticker";
	var price= float(json.loads(requests.get(request).content.decode("utf-8"))[u'price']);
	return price
}

function get_product_order_book(pcode,the_level){
	URL = "https://api.pro.coinbase.com"
	# Make a get request to get the latest position of the international space station from the opennotify api.
	if the_level > 3 :
		return "Error 3"
	elif the_level < 1 :
		return "Error 1"
	else :
		request = URL + "/products/" + pcode + "/book/?level=" + str(the_level)
		response = requests.get(request)
		response_str = response.content.decode("utf-8")
		response_json = json.loads(response_str)
		return response_json
}

function Process_Set(PVdata){
	/* Add labels to the data columns of the Pandas dataframe
	Group the data together (for level 3 data this is necessary because
	There is an entry for every order in the book and there me be hundreds
	or thousands of orders at a given price, This puts all those with exactly
	the same price together)
	Then perform a guassian mean on the price and gaussian Sum on the Volume
	*/
	pvnp = np.array(PVdata);
	pv_df = pd.DataFrame(pvnp);
	pv_df.columns = ['Price', 'Volume', 'Count_Address'];
	pv_df["Price"] = pv_df["Price"].astype(np.float);
	pv_df["Volume"] = pv_df["Volume"].astype(np.float);
	pv_df_return = pv_df.filter(['Price', 'Volume'], axis=1);
	# Group all data with the same price together
	pv_df_return = pv_df_return.groupby(['Price'], as_index=False)['Volume'].sum();
	# Smooth the data with guassian window type;
	pv_df["Price"] = pv_df["Price"].rolling(window=SMA_Count,win_type='gaussian').mean(std= 2);
	pv_df["Volume"] = pv_df["Volume"].rolling(window=SMA_Count,win_type='gaussian').sum(std= 2);
	return pv_df_return;
}

function Process_OB(Order_Book){
	//takes the entire order book with bids and asks
	//smooths the data by running the asks and the bids through Process_Set
	bids = Order_Book[u'bids'];
	bids_return = Process_Set(bids);
	asks= Order_Book[u'asks'];
	asks_return = Process_Set(asks);
	return (bids_return, asks_return);
}

def Graph_data(bids, asks, pct_low, pct_high):
	global Current_Product
	current_price = (bids["Price"].max() + asks["Price"].min())/2.0
	min_price = current_price*pct_low
	max_price = current_price*pct_high
	print("Current Price: {:5.2f}  Miniumum: {:10.2f}     Maximum: {:10.2f}".format(current_price, min_price, max_price))
	bids= bids[(bids.Price >= min_price) & (bids.Price <= current_price)]
	asks= asks[(asks.Price >= current_price) & (asks.Price <= max_price)]
	Bids = go.Scatter(x=bids.Price.values,y=bids.Volume.values,
		line = dict(color= ('rgb(0, 255, 100)'), width= 2),
		name = 'Bids'
	)
	Asks = go.Scatter(x=asks.Price.values,y=asks.Volume.values,
		line = dict(color = ('rgb(255, 165, 0)'), width = 2),
		name = 'Asks'
	)
	the_data = [Bids, Asks]
	the_layout = dict(title= Current_Product +' Order Book',
						font = dict(family='Arial, sans-serif',
						size = 18,
						color = 'lightgrey',
						hovermode= 'closest'
				),
				xaxis = dict(title = 'Price (USD)',
						family='Arial, sans-serif',
            			size=18,
            			color='lightgrey',
						linecolor='darkgrey',
						gridcolor='darkgrey',
						rangemode='nonnegative',
						fixedrange=True
				),
				yaxis = dict(title = 'Volume',
						family='Arial, sans-serif',
            			size=18,
            			color='lightgrey',
            			rangemode='nonnegative',
            			linecolor='darkgrey',
						gridcolor='darkgrey',
						fixedrange=True
				),
				margin= go.Margin(
					l=75,
					r=75,
					b=75,
					t=60,
					pad=4
				),
				# V0.3 tranasparent background so that html will set background color
				paper_bgcolor = 'rgba(0,0,0,0)',
  				plot_bgcolor = 'rgba(0,0,0,0)',
  				hovermode = 'closest',
  				showlegend = False
	)
	the_config = {'displayModeBar' : False}
	print('The Layout: \n', the_layout)
	print('the config: \n', the_config)
	print('Graph_Data Current_Product: ',Current_Product)
	fig = dict(data= the_data, layout= the_layout, config= the_config)
	return fig


app = dash.Dash(__name__, static_folder='static')
app.title = "Order Book"

app.layout = html.Div(id='main',children=[
	html.Link(href='/static/style.css', rel='stylesheet'),
	html.Div(id='ctl-bar',children=[
		html.Div(id='dropdown-choice',children=[
    		dcc.Dropdown(
				id='input-cryptochoice',
				options=[
					{'label': 'BCH', 'value': 'BCH'},
					{'label': 'BTC', 'value': 'BTC'},
					{'label': 'ETH', 'value': 'ETH'},
					{'label': 'LTC', 'value': 'LTC'}
				],
				value='BTC'
			)
		]),
		html.Div(id='price_cell', children=[
			html.Div(id='output-price')
		])
	]),
	dcc.Interval(
		id='interval-component',
		interval=30*1000, # in milliseconds
		n_intervals=0
	),
	html.Div(id='graph-tablet',children= [
		html.Div(id='graph-area', children=[
			dcc.Graph(id='indicator-graphic',
				style={
					'height': '90vh'
			})
		])
	])
])

# Instructions on having more than one input
# https://dash.plot.ly/getting-started-part-2
@app.callback(
	dash.dependencies.Output('output-price', 'children'),
	[dash.dependencies.Input('input-cryptochoice', 'value'),
	dash.dependencies.Input('interval-component', 'n_intervals')]
	)
def update_output(value, n):
	# Get the price and put it into the conrol bar
	# Update graph
	global Current_Product
	checkpc= '{}'.format(value + '-USD')
	Current_Product= checkpc
	current_price= Get_Price(Current_Product)
	price= '$' + locale.format("%.*f", (2, current_price), True)
	return price

@app.callback(
	dash.dependencies.Output('indicator-graphic', 'figure'),
	[dash.dependencies.Input('input-cryptochoice', 'value'),
	dash.dependencies.Input('interval-component', 'n_intervals')],
	[State('indicator-graphic', 'relayoutData')])

def update_graph(value, n, relayout_data):
	global Current_Product
	
	print('Relay Out: \n', relayout_data)
#	if relayout_data :
#		if 'xaxis.range[0]' in relayout_data:
#			new_figure['layout']['xaxis']['range'] = [
#				relayout_data['xaxis.range[0]'],
#				relayout_data['xaxis.range[1]']
#			]
	checkpc= '{}'.format(value + '-USD')
	Current_Product= checkpc
	Order_Book = get_product_order_book(Current_Product, Data_Level)
	(bids_df, asks_df) = Process_OB(Order_Book)
	return Graph_data(bids_df, asks_df, 0.1, 2.5)


if __name__ == '__main__':
	app.run_server(debug=True, port=8050, host='0.0.0.0'
	)

