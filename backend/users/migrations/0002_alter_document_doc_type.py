# Generated by Django 5.2.4 on 2025-07-07 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='doc_type',
            field=models.CharField(choices=[('PASSPORT', 'Passport'), ('PROOF_OF_ADDRESS', 'Proof of Address'), ('ID_CARD', 'ID Card'), ('LICENSE', 'Drivers License')], default='PASSPORT', max_length=32),
        ),
    ]
