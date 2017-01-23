#!/usr/bin/env sh

# Make sure Bundler is installed
if [ "$(gem query -i -n bundler)" = "false" ]; then
  echo "Installing Bundler..."
  gem install bundler
fi

# Set up Ruby dependencies via Bundler
echo "Cleaning old Dependencies..."
bundle clean --force

# Set up Ruby dependencies via Bundler
echo "Installing Dependencies..."
bundle install --path .bundle/_vendor/bundle