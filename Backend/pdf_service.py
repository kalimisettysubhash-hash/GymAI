from io import BytesIO
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_pdf(guide_data):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    title_style = styles['Title']
    heading_style = styles['Heading2']
    normal_style = styles['Normal']
    
    # Custom styles
    subtitle_style = ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.dimgray,
        spaceAfter=12
    )

    story = []
    
    # Title
    equipment = guide_data.get('equipmentName') or guide_data.get('equipment') or 'Equipment'
    story.append(Paragraph(f"Maintenance Guide: {escape(str(equipment))}", title_style))
    
    # Subtitle Info
    customer = guide_data.get('customerName', 'N/A')
    usage = guide_data.get('usageFrequency', 'N/A')
    date = guide_data.get('generatedDate') or guide_data.get('generatedAt') or 'N/A'
    
    story.append(Paragraph(f"<b>Customer:</b> {escape(str(customer))}", subtitle_style))
    story.append(Paragraph(f"<b>Usage:</b> {escape(str(usage))}", subtitle_style))
    story.append(Paragraph(f"<b>Generated At:</b> {escape(str(date))}", subtitle_style))
    story.append(Spacer(1, 12))

    sections = [
        ("Cleaning Tips", guide_data.get("cleaning", [])),
        ("Maintenance Tips", guide_data.get("maintenance", [])),
        ("Safety Tips", guide_data.get("safety", [])),
        ("Service Schedule", guide_data.get("service", []))
    ]

    for title, items in sections:
        if items:
            story.append(Paragraph(title, heading_style))
            list_items = [ListItem(Paragraph(escape(str(item)), normal_style)) for item in items]
            story.append(ListFlowable(list_items, bulletType='bullet', bulletColor=colors.black))
            story.append(Spacer(1, 12))

    doc.build(story)
    buffer.seek(0)
    return buffer
