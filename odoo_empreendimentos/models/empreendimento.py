from odoo import models, fields

class Empreendimento(models.Model):
    _name = 'empreendimento.blockurb'
    _description = 'Empreendimento Imobiliário'
    _order = 'create_date desc'

    name = fields.Char('Nome', required=True)
    descricao = fields.Text('Descrição')
    masterplan = fields.Binary('Masterplan (imagem)', attachment=True)
    geojson = fields.Binary('GeoJSON dos Lotes', attachment=True)
    lote_count = fields.Integer('Total de Lotes', compute='_compute_lote_count', store=True)
    lote_ids = fields.One2many('empreendimento.lote', 'empreendimento_id', string='Lotes')
    
    def _compute_lote_count(self):
        for rec in self:
            rec.lote_count = len(rec.lote_ids)

class Lote(models.Model):
    _name = 'empreendimento.lote'
    _description = 'Lote do Empreendimento'
    _order = 'id desc'

    name = fields.Char('Código do Lote', required=True)
    status = fields.Selection([
        ('disponivel', 'Disponível'),
        ('reservado', 'Reservado'),
        ('vendido', 'Vendido'),
    ], string='Status', default='disponivel')
    area = fields.Float('Área (m²)')
    preco = fields.Float('Preço (R$)')
    empreendimento_id = fields.Many2one('empreendimento.blockurb', string='Empreendimento', ondelete='cascade')
