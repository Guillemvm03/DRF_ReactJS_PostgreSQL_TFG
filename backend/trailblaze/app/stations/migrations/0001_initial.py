# Generated by Django 5.0.1 on 2024-02-22 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_name', models.CharField(max_length=50)),
                ('slug', models.SlugField(editable=False, max_length=150, unique=True)),
                ('description', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('lat', models.CharField(max_length=150)),
                ('lng', models.CharField(max_length=150)),
                ('capacity', models.IntegerField()),
                ('image', models.CharField(max_length=150)),
                ('status', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'Station',
            },
        ),
    ]
