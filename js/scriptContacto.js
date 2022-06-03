let getBasePATH = ({ path }) =>
	`https://apps.gasco.cl/v1/locationService/${path}`;

$(document).ready(() => {
	let url = getBasePATH({ path: "regions/getAllRegions/" });
	$("#selectRegion").append(new Option("Seleccione una region...", 0, true));
	$("#selectComuna").append(new Option("Seleccione una comuna...", 0, true));
	$("#selectProvincia").append(
		new Option("Seleccione una provincia...", 0, true)
	);
	$.get(url, ({ data }) => {
		data.forEach(({ id, name }) => {
			$("#selectRegion").append(new Option(name, id));
		});
	});
});

$("#selectRegion").change(() => {
	let regionId = $("#selectRegion").val();
	$("#selectProvincia").empty();
	if (regionId !== "0") {
		let url = getBasePATH({ path: `provinces/byRegionId/${regionId}/` });
		$.get(url, ({ data }) => {
			$("#selectProvincia").append(
				new Option("Seleccione una provincia...", 0, true)
			);
			data.forEach(({ id, name }) => {
				$("#selectProvincia").append(new Option(name, id));
			});
		});
	}
});

$("#selectProvincia").change(() => {
	let provinciaId = $("#selectProvincia").val();
	$("#selectComuna").empty();
	if (provinciaId !== "0") {
		let url = getBasePATH({ path: `communes/byProvinceId/${provinciaId}/` });
		$.get(url, ({ data }) => {
			$("#selectComuna").append(
				new Option("Seleccione una comuna...", 0, true)
			);
			data.forEach(({ id, name }) => {
				$("#selectComuna").append(new Option(name, id));
			});
		});
	}
});

$("form").submit((e) => {
	e.preventDefault();
	let nombre = $("#inputNombre").val();
	let correo = $("#inputCorreo").val();
	let comuna = $("#selectComuna").val();

	let isValid = false;
	if (nombre == "" && !isValid) {
		isValid = true;
	}
	if (
		correo == "" ||
		(correo.match(/@gmail.com|@duocuc.com|@profesor.duoc.cl/) != -1 && !isValid)
	) {
		isValid = true;
	}
	if (comuna == "0" && !isValid) {
		isValid = true;
	}
	if (!isValid) {
		$(".alert-success").addClass("show");
		setTimeout(() => {
			$(".alert-success").removeClass("show");
		}, 3000);
	} else {
		$(".alert-danger").addClass("show");
		setTimeout(() => {
			$(".alert-danger").removeClass("show");
		}, 3000);
	}
});
