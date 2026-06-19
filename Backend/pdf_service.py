from io import BytesIO
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, Table, TableStyle
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

    priority = guide_data.get('priority') or {}
    if isinstance(priority, dict) and priority.get('label'):
        story.append(Paragraph(f"<b>Priority:</b> {escape(str(priority.get('label')))}", subtitle_style))

    next_maintenance = guide_data.get('nextMaintenanceDate')
    if next_maintenance:
        story.append(Paragraph(f"<b>Next Recommended Maintenance:</b> {escape(str(next_maintenance))}", subtitle_style))

    estimated_cost = guide_data.get('estimatedCost') or {}
    if isinstance(estimated_cost, dict):
        monthly = estimated_cost.get('monthly')
        yearly = estimated_cost.get('yearly')
        if monthly and yearly:
            story.append(Paragraph(f"<b>Estimated Cost:</b> Monthly Rs.{escape(str(monthly))} | Yearly Rs.{escape(str(yearly))}", subtitle_style))

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

    schedule = guide_data.get("schedule", [])
    if schedule:
        story.append(Paragraph("Maintenance Schedule Table", heading_style))
        table_data = [["Maintenance Task", "Frequency"]]
        for item in schedule:
            if isinstance(item, dict):
                table_data.append([
                    Paragraph(escape(str(item.get("task", ""))), normal_style),
                    Paragraph(escape(str(item.get("frequency", ""))), normal_style),
                ])

        if len(table_data) > 1:
            table = Table(table_data, colWidths=[300, 120])
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1f2937")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f8fafc")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]))
            story.append(table)
            story.append(Spacer(1, 12))

    doc.build(story)
    buffer.seek(0)
    return buffer
