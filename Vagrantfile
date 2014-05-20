# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure VAGRANTFILE_API_VERSION do |config|
  # Use the purescript box.
  config.vm.box = "PureScript"
  # Replace this with an actual url when the box is uploaded.
  # until then you can clone https://github.com/joneshf/purescript-vagrant and
  # build a bot, then replace this line with where the box was built.
  config.vm.box_url = "../PureScript.box"

  config.vm.network "forwarded_port", :guest => 8000, :host => 8080, :auto_correct => true
end
