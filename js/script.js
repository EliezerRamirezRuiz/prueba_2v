let getBasePATH = (select, limit = "") =>
	`https://chilealerta.com/api/query/?user=demo&select=${select}${
		limit ? `&limit=${limit}` : ""
	}`;

$(document).ready(() => {
	$("#table").hide();
});

let onChange = (e) => {
	$("#table").show();
	let value = e.value;
	[value, limit] = value.includes(";") ? value.split(";") : [value, ""];
	let url = getBasePATH(value, limit);
	value == "0"
		? $("#tbody").empty()
		: value == "onemi"
		? $.get(url, (data) => {
				$("#tbody").empty();

				$("#thead")
					.empty()
					.append(
						'<tr><th scope="col">Titulo</th><th scope="col">Region</th><th scope="col">Fecha</th><th scope="col">Url</th></tr>'
					);
				data = data[value];
				data.forEach(({ post_title, alert_region, alert_date, url }) =>
					$("#tbody").append(
						`<tr><th scope="row">${post_title}</th><td>${alert_region}</td><td>${alert_date}</td><td>${url}</td></tr>`
					)
				);
		  })
		: $.get(url, (data) => {
				$("#tbody").empty();
				$("#thead")
					.empty()
					.append(
						'<tr><th scope="col">Fuente</th><th scope="col">Magnitud</th><th scope="col">Referencia</th><th scope="col">Hora local</th></tr>'
					);
				data = data[value];

				data.forEach(({ source, magnitude, utc_time, local_time, reference }) =>
					$("#tbody").append(
						`<tr><th scope="row">${source}</th><td>${magnitude}</td><td>${reference}</td><td>${
							utc_time || local_time
						}</td></tr>`
					)
				);
		  });
};

const createDiv = ({ source, magnitude, utc_time, local_time, reference }) =>
	source;

const onInitIndex = () => {
	const idDivs = [
		"ultimos_sismos",
		"tsunami_chile",
		"ultimos_sismos_chile",
		"onemi",
	];
	idDivs.forEach((item) => {
		setTimeout(() => "", 60001);
		let url = getBasePATH(item);
		item == "onemi"
			? $.get(url, (data) => {
					let { post_title, alert_region, alert_date, url } = data[item][0];
					$(`#${item} ul`).append(
						`<li>${post_title}<li/><li>${alert_date}<li/><li>${alert_region}<li/>`
					);
			  })
			: $.get(url, (data) => {
					let { source, magnitude, utc_time, local_time, reference } =
						data[item][0];
					$(`#${item} ul`).append(
						`<li>${magnitude}<li/><li>${
							utc_time || local_time
						}<li/> <li>${source}<li/>`
					);
			  });
	});
};
