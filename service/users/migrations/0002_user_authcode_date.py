# Generated by Django 4.1.6 on 2023-02-03 21:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="authcode_date",
            field=models.DateTimeField(default=datetime.datetime(1970, 1, 1, 0, 0)),
        ),
    ]
