<template>
  <v-layout column align-horiz-center align-vert-center>
    <v-col xs12 sm8 md6>
      <v-card>
        <v-card-text>
          <p>Hallo Paul</p>
          <p>damit dir nicht so langeweilig beim Programmieren ist, tippe ich dir hier einen lieben Text ein. Ich freue mich total auf die neue Wohnung und kann es kaum abwarten, dort mit dir einzuziehen. Ich weiß, du glaubst mir das wahrscheinlich nicht, aber ich liebe dich sehr und bin glücklich mit dir. Ich muss das nur noch meinem Kopf sagen. If you want kussies just come to me. Find a kiss? Report it to me.</p>
          <p>Thank you for staying with me even when I am like shit.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Kathi Schaal</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn primary flat router to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
