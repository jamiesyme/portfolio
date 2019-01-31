# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  #config.vm.box = "ubuntu/bionic64"
  config.vm.box = "xenial64_vb6"

  config.vm.network "forwarded_port", guest: 80, host: 3335

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end

  # Bootstrap the app
  config.vm.provision "shell", inline: <<-SHELL
    cd /vagrant
    ./scripts/dev-bootstrap.sh
  SHELL

  # Start NGINX
  config.vm.provision "shell", run: "always", inline: <<-SHELL
    sudo service nginx start
  SHELL

  # Disable the Ubuntu console log from being generated.
  # See: https://groups.google.com/forum/#!topic/vagrant-up/eZljy-bddoI
  config.vm.provider "virtualbox" do |vb|
    vb.customize [ "modifyvm", :id, "--uartmode1", "disconnected" ]
  end
end
