odoo.define('odoo_empreendimentos.map_preview', function (require) {
    "use strict";
    var core = require('web.core');
    var FormController = require('web.FormController');
    var field_utils = require('web.field_utils');

    // Carrega Leaflet dinamicamente se necessário
    function loadLeaflet(callback) {
        if (window.L) return callback();
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(css);
        var script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = callback;
        document.body.appendChild(script);
    }

    FormController.include({
        _renderMapPreview: function() {
            var self = this;
            setTimeout(function() {
                var $map = $('#map_preview');
                if (!$map.length) return;
                $map.empty();
                var geojson_b64 = self.renderer.state.data.geojson;
                var masterplan_b64 = self.renderer.state.data.masterplan;
                if (!geojson_b64) {
                    $map.append('<div style="color:#888">Envie um arquivo GeoJSON para visualizar o preview do mapa.</div>');
                    return;
                }
                // Decodifica base64 para texto
                var geojson_text = atob(geojson_b64.split(',').pop());
                var geojson;
                try {
                    geojson = JSON.parse(geojson_text);
                } catch (e) {
                    $map.append('<div style="color:#c00">GeoJSON inválido.</div>');
                    return;
                }
                loadLeaflet(function() {
                    $map.css({height:'400px'});
                    var map = L.map('map_preview').setView([-14.2, -51.9], 4);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap'
                    }).addTo(map);
                    var layer = L.geoJSON(geojson, {
                        style: function(f) {
                            return {color: '#007bff', weight: 2, fillOpacity: 0.2};
                        },
                        onEachFeature: function (feature, layer) {
                            if (feature.properties && feature.properties.name) {
                                layer.bindPopup(feature.properties.name);
                            }
                        }
                    }).addTo(map);

                    // Adiciona overlay do masterplan se existir
                    if (masterplan_b64) {
                        // Bounds: tenta pegar do GeoJSON (primeiro polígono), senão usa bounds default
                        var bounds = [[-23.560, -46.650], [-23.552, -46.640]]; // default exemplo
                        try {
                            if (geojson.features && geojson.features.length > 0) {
                                var geom = geojson.features[0].geometry;
                                if (geom.type === 'Polygon' && geom.coordinates[0].length >= 2) {
                                    var lats = geom.coordinates[0].map(function(c){return c[1];});
                                    var lngs = geom.coordinates[0].map(function(c){return c[0];});
                                    var sw = [Math.min.apply(null, lats), Math.min.apply(null, lngs)];
                                    var ne = [Math.max.apply(null, lats), Math.max.apply(null, lngs)];
                                    bounds = [sw, ne];
                                }
                            }
                        } catch(e) {}
                        var imgUrl = masterplan_b64;
                        if (!imgUrl.startsWith('data:')) imgUrl = 'data:image/png;base64,' + imgUrl;
                        L.imageOverlay(imgUrl, bounds, {opacity:0.6, interactive:false}).addTo(map);
                    }

                    try {
                        map.fitBounds(layer.getBounds(), {padding: [20,20]});
                    } catch(e) {}
                });
            }, 400);
        },
        _onFieldChanged: function (event) {
            this._super.apply(this, arguments);
            if (event.data.changes.geojson !== undefined || event.data.changes.masterplan !== undefined) {
                this._renderMapPreview();
            }
        },
        renderButtons: function() {
            this._super.apply(this, arguments);
            if (this.$buttons && this.modelName === 'empreendimento.blockurb') {
                this._renderMapPreview();
            }
        },
        update: function () {
            var res = this._super.apply(this, arguments);
            if (this.modelName === 'empreendimento.blockurb') {
                this._renderMapPreview();
            }
            return res;
        },
    });
});
