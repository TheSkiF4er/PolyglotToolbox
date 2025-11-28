plugins {
    kotlin("jvm") version "1.8.22"
    application
}

group = "com.polyglot.toolbox"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
}

application {
    mainClass.set("com.polyglot.toolbox.TextStatsKt")
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}
