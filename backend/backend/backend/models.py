from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='images/')

class Labels(models.Model):
    name = models.CharField(max_length=200)
    id = models.IntegerField(primary_key=True)

    def __str__(self):
        return self.name
