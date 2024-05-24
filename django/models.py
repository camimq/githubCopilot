from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.urls import reverse


# Build out a conference website
# Add a speaker, a track, and a talk
# Make sure that parent can´t be deleted if there are children

# Create your models here.

# Create speaker model with name, email and linkedin
class Speaker(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    linkedin = models.URLField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('speaker_detail', args=[str(self.id)])
    
# Create track with name and description and abbreviation
class Track(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    abbreviation = models.CharField(max_length=3, validators=[RegexValidator(r'^[A-Z]{3}$')])

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('track_detail', args=[str(self.id)])
    
# Create talk with title, description, speaker, track, and date
class Talk(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    speaker = models.ForeignKey(Speaker, on_delete=models.PROTECT)
    track = models.ForeignKey(Track, on_delete=models.PROTECT)
    date = models.DateField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('talk_detail', args=[str(self.id)])