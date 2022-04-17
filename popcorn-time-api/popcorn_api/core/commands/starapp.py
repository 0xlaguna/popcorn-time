import os

from django.core.management.templates import TemplateCommand


class Command(TemplateCommand):
    missing_args_message = "You must provide an application name."

    def handle(self, **options):
        app_name = options.pop("name")
        path = "./apps/" + app_name

        try:
            os.mkdir(path)
            target = path
        except FileExistsError:
            message = "/ already exists, overlaying a project or app into an "
            "existing directory won't replace conflicting files"
            raise FileExistsError(path + message)
        super().handle("app", app_name, target, **options)
