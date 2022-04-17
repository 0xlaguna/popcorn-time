from django.core import management
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        management.call_command("makemigrations")
        management.call_command("migrate")
