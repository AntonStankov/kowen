# Generated by Django 4.1.7 on 2023-03-15 20:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='roles',
        ),
        migrations.DeleteModel(
            name='Role',
        ),
    ]