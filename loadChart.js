class Loader{
	static loadChart(selector, dataUrl, option){
		$.ajax({
		    type: "GET",
		    url: dataUrl,
		    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
		    success: function (data) {
		        createChart(selector,initData(data, option));
		    },
		    error: function (e) {
		        createChart(selector,{title:option.title,series : [{type: 'line'}]});
		    }
		});

		function initData(data, option){
			data = data.split(/[\r\n]+/);
			let obj = {
				title : option.title,
				categories : [],
				series : []
			};
			let names = data[option.nameRow].split(/\s+/);
			for(let i=option.firstColumn;i<names.length;i++){
				obj.series.push({name:names[i],data:[],visible:!option.showColumns||(option.showColumns&&-1!=option.showColumns.indexOf(names[i]))});
			}
			for(let i=option.nameRow+1;i<data.length-option.redundantRow;i++){
				let array = data[i].split(/\s+/);
				if(option.rowFilter&&array[option.rowFilter.index]!=option.rowFilter.value){
					continue;
				}
				obj.categories.push(array[1]=="PM"?((parseInt(array[0].substring(0,2))%12+12)+array[0].substring(2,5)):(array[0].substring(0,2)==12?"00"+array[0].substring(2,5):array[0].substring(0,5)));
				for(let j=option.firstColumn;j<array.length;j++){
					obj.series[j-option.firstColumn].data.push(parseFloat(array[j]));
				}
			}
			return obj;
		}
		
		function createChart(selector,data){
			var chart = Highcharts.chart(selector, {
				chart: {
					type: 'line',
					zoomType: 'x',
					panning: true,
					panKey: 'shift'
				},
				credits:{
				    enabled: false // 禁用版权信息
				},
				title: {
					text: data.title
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},
				xAxis: {
			        categories: data.categories
			    },
			    yAxis: {
		            title: {
		                text: null
		            }
		        },
		        plotOptions: {
					series: {
						marker: {
							enabled: false
						}
					}
				},
				series: data.series,
				noData: {
					style: {
						fontWeight: 'bold',
						fontSize: '15px',
						color: '#303030'
					}
				},
				responsive: {
					rules: [{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom'
							}
						}
					}]
				}
	    	});
	    	if (!chart.hasData()){
	    		chart.legend.update({
					enabled: false
				});
				console.log(111);
				chart.hideNoData();
				chart.showNoData();
	    	}
		}
	}
}