{
    'name': 'Empreendimentos BlockURB',
    'version': '1.0.0',
    'summary': 'Gestão de empreendimentos imobiliários com preview e mapa',
    'description': 'Módulo para cadastro, listagem e visualização de empreendimentos com preview de masterplan e lotes no mapa.',
    'author': 'BlockURB',
    'category': 'Real Estate',
    'depends': ['base', 'web'],
    'data': [
        'views/empreendimento_views.xml',
        'security/ir.model.access.csv',
        'views/menu.xml',
        'views/assets.xml',
    ],
    'installable': True,
    'application': True,
}