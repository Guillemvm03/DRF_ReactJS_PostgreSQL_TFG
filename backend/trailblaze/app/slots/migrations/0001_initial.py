# Generated by Django 5.0.1 on 2024-02-22 19:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bikes', '0001_initial'),
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=200)),
                ('bike', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slots', to='bikes.bike')),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='slots', to='stations.station')),
            ],
        ),
    ]
